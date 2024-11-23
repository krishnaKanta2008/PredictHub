"use client"

import {
    LibraryBig,
    Home,
    Settings,
    ChevronRight,
    ChevronsUpDown,
    // LifeBuoy,
    LogOut,
    List,
    ChartNoAxesCombined,
    CircleAlert
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    DropdownMenu,
    DropdownMenuContent,
    // DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ModeSwitch } from "../Theme/mode-switch"

const BACKEND_URL = 'http://localhost:5000'

const storedUsername = localStorage.getItem('predicthub_username')

const data = {
    navMain: [
        {
            title: "DashBoard",
            url: "/home",
            icon: Home,
            isActive: true,

        },
        {
            title: "Prediction",
           
            icon: ChartNoAxesCombined,
            items: [
                { title: "LSTM", url: "/lstm" },
            ],
        },
        {
            title: "Watchlist",
            url: `/watchlist/${storedUsername}`,
            icon: List,
            isActive: true,

        },
        {
            title: "Learning",
            url: "/learning",
            icon: LibraryBig,
            isActive: true,

        },
        // {
        //     title: "Settings",
        //     url: "#",
        //     icon: Settings,
        //     items: [
        //         { title: "Theme", url: "#" },
        //         { title: "Account", url: "#" },
        //         // { title: "Edit Account", url: "#" },
        //         // { title: "Limits", url: "#" },
        //     ],
        // },
    ],
    navSecondary: [
        { title: "Support", url: "/support", icon: CircleAlert },
        // { title: "Feedback", url: "#", icon: Send },
    ],

}

export function AppSidebar() {
    const navigate = useNavigate()
    // const [userImage, setUserImage] = useState<string>('')
    const [username, setUsername] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUsername = localStorage.getItem('predicthub_username')
                if (!storedUsername) {
                    navigate('/')
                    return
                }

                setUsername(storedUsername)

                const response = await fetch(`${BACKEND_URL}/profile/${storedUsername}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch user data')
                }

                const responseData = await response.json()
                console.log('Fetched user data:', responseData)

                // setUserImage(responseData.user?.image || '')
                setUserName(responseData.username)
                setUserEmail(responseData.email)
            } catch (error) {
                console.error('Error fetching user data', error)
            }
        }

        fetchUserData()
    }, [navigate])

    function logout() {
        console.log('Logout clicked')
        localStorage.removeItem('predicthub_username')
        setUsername(null)
        navigate('/')
    }

    return (
        <Sidebar variant="inset" className="border-r bg-opacity-90 backdrop-blur-sm">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <span className="text-2xl">📈</span>
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold text-xl">Predicthub</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {data.navMain.map((item) => (
                            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                    {item.items?.length ? (
                                        <>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                    <ChevronRight />
                                                    <span className="sr-only">Toggle</span>
                                                </SidebarMenuAction>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton asChild>
                                                                <a href={subItem.url}>
                                                                    <span>{subItem.title}</span>
                                                                </a>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </>
                                    ) : null}
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                    <SidebarMenu>

                        <Collapsible asChild >
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Settings">
                                    <a>
                                        <Settings />
                                        <span>Setting</span>
                                    </a>
                                </SidebarMenuButton>
                                <>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                                            <ChevronRight />
                                            <span className="sr-only">Toggle</span>
                                        </SidebarMenuAction>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuSubButton asChild>
                                                            <a>
                                                                <span>Theme</span>
                                                            </a>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <div className='flex items-center'>
                                                        <AlertDialogHeader className='text-2xl'>Change Theme</AlertDialogHeader>
                                                        <div className='flex-grow'></div>
                                                        <AlertDialogCancel className="ml-6"><Cross1Icon className='h-3 w-3' /></AlertDialogCancel>
                                                    </div>
                                                    <ModeSwitch/>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                            
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <a>
                                                        <span>Account</span>
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>

                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>

                            </SidebarMenuItem>
                        </Collapsible>

                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup className="mt-auto">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.navSecondary.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild size="sm">
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        {/* <AvatarImage src={userImage || undefined} alt={userName || "User"} /> */}
                                        <AvatarFallback className="rounded-lg">{userName?.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {userName || username || "User"}
                                        </span>
                                        <span className="truncate text-xs">
                                            {userEmail || "user@example.com"}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <a href={`/profile/${userName}`}>
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            {/* <AvatarImage src={userImage || undefined} alt={userName || "User"} /> */}
                                            <AvatarFallback className="rounded-lg">{userName?.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {userName || username || "User"}
                                            </span>
                                            <span className="truncate text-xs">
                                                {userEmail || "user@example.com"}
                                            </span>
                                        </div>
                                    </div>
                                    </a>
                                    
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>
                                    <LogOut className="mr-3" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
