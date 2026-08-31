import readline from "node:readline";
import { stdin as stdinStream, stdout as stdoutStream, stderr as stderrStream } from "node:process";

function question(query: string, hidden = false): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: stdinStream,
      output: hidden ? stderrStream : stdoutStream,
      terminal: true,
    });
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

export type Credentials = { email: string; password: string };

/** Prompt the user once for their Firebase Auth email/password in the terminal.
 * Nothing is written to disk or env — the values live only in memory for this run. */
export async function promptForCredentials(): Promise<Credentials> {
  const email = (await question("Firebase Auth email: ")).trim();
  if (!email) throw new Error("No email provided. Aborting Firestore import.");
  const password = await question("Firebase Auth password: ", true);
  if (!password) throw new Error("No password provided. Aborting Firestore import.");
  process.stdout.write("\n");
  return { email, password };
}

/**
 * Exchange email/password for a Firebase ID token via the Identity Toolkit REST
 * API (the same REST flow the Web SDK uses). The token is what Firestore Security
 * Rules validate to permit the write as an authenticated user.
 */
export async function getIdToken(creds: Credentials, apiKey: string): Promise<string> {
  const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: creds.email,
      password: creds.password,
      returnSecureToken: true,
    }),
  });
  const body = (await res.json()) as { idToken?: string; error?: { message?: string } };
  if (!res.ok || !body.idToken) {
    throw new Error(`Sign-in failed: ${body.error?.message ?? res.statusText}`);
  }
  return body.idToken;
}
