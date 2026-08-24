/**
 * STYLE: Editorial Cartography. The provided authenticated dashboard shell is
 * retained, but its navigation adopts Sonata’s high-contrast editorial language.
 */
import { useAuth } from "@/_core/hooks/useAuth";
import { SonataMark } from "@/components/SonataMark";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { startLogin } from "@/const";
import { useIsMobile } from "@/hooks/useMobile";
import { BookOpenText, ClipboardCheck, Database, LogOut, PanelLeft } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from "./DashboardLayoutSkeleton";

const menuItems = [
  { icon: ClipboardCheck, label: "Workbench", path: "/editorial" },
  { icon: BookOpenText, label: "Public catalogue", path: "/" },
  { icon: Database, label: "Foundation", path: "/editorial" },
];
const SIDEBAR_WIDTH_KEY = "sonata-editorial-sidebar-width";
const DEFAULT_WIDTH = 268;
const MIN_WIDTH = 220;
const MAX_WIDTH = 420;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();

  useEffect(() => { localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString()); }, [sidebarWidth]);
  if (loading) return <DashboardLayoutSkeleton />;
  if (!user) {
    return (
      <div className="sonata-editorial-login">
        <SonataMark inverted />
        <div>
          <p className="eyebrow eyebrow--brass">Editorial access</p>
          <h1>Sign in to enter the workbench.</h1>
          <p>The public catalogue is open. Review, provenance, and import capabilities require a protected editorial identity.</p>
        </div>
        <Button onClick={() => startLogin()} className="button-primary button-primary--light">Sign in securely</Button>
      </div>
    );
  }
  return (
    <SidebarProvider style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}>
      <DashboardLayoutContent setSidebarWidth={setSidebarWidth}>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}

function DashboardLayoutContent({ children, setSidebarWidth }: { children: React.ReactNode; setSidebarWidth: (width: number) => void }) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isCollapsed = state === "collapsed";

  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (!isResizing) return;
      const left = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const nextWidth = event.clientX - left;
      if (nextWidth >= MIN_WIDTH && nextWidth <= MAX_WIDTH) setSidebarWidth(nextWidth);
    };
    const up = () => setIsResizing(false);
    if (isResizing) {
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground" disableTransition={isResizing}>
          <SidebarHeader className="h-[74px] justify-center border-b border-sidebar-border">
            <div className="flex items-center gap-3 px-3 w-full">
              <button onClick={toggleSidebar} className="h-8 w-8 flex items-center justify-center hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sidebar-ring" aria-label="Toggle editorial navigation" title="Toggle editorial navigation">
                <PanelLeft className="h-4 w-4 text-sidebar-foreground" />
              </button>
              {!isCollapsed ? <SonataMark inverted /> : null}
            </div>
          </SidebarHeader>
          <SidebarContent className="gap-0 pt-4">
            <p className="px-4 pb-2 text-[9px] tracking-[.16em] uppercase text-[#b8b0a4] group-data-[collapsible=icon]:hidden">Knowledge operations</p>
            <SidebarMenu className="px-2 py-1">
              {menuItems.map(item => (
                <SidebarMenuItem key={`${item.label}-${item.path}`}>
                  <SidebarMenuButton isActive={location === item.path && item.label === "Workbench"} onClick={() => setLocation(item.path)} tooltip={item.label} className="h-10 rounded-none font-medium text-sidebar-foreground hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent data-[active=true]:text-[#dcc49b]">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-3 border-t border-sidebar-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 px-1 py-1 w-full text-left hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sidebar-ring">
                  <Avatar className="h-8 w-8 border border-sidebar-border shrink-0"><AvatarFallback className="text-xs font-medium bg-[#2b2924] text-[#f2f0e9]">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden"><p className="text-sm font-medium truncate leading-none">{user?.name || "Editorial user"}</p><p className="text-[10px] text-[#b8b0a4] truncate mt-1.5">Protected session</p></div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48"><DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive"><LogOut className="mr-2 h-4 w-4" />Sign out</DropdownMenuItem></DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        {!isCollapsed ? <div className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#b68a4a]/30" onMouseDown={() => setIsResizing(true)} style={{ zIndex: 50 }} /> : null}
      </div>
      <SidebarInset>
        {isMobile ? <div className="flex border-b h-14 items-center justify-between bg-background px-3"><SidebarTrigger className="h-9 w-9 rounded-none bg-background" /><span className="text-[10px] tracking-[.12em] uppercase font-bold">Editorial workbench</span></div> : null}
        <main className="flex-1 p-4 lg:p-7">{children}</main>
      </SidebarInset>
    </>
  );
}
