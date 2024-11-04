// components/Sidebar.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Layout,
  Calendar,
  Settings,
  Users,
  Heart,
  HelpCircle,
  Menu,
  X,
  MessageCircle,
  Bell,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { HiSparkles } from "react-icons/hi2";


const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Sparkles, label: 'AI Tools', path: '/ai-tools' },
    { icon: Layout, label: 'Projects', path: '/projects' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out z-50
        ${isExpanded ? 'w-64' : 'w-20'} 
        border-r border-gray-200 dark:border-gray-800`}
    >
      {/* Toggle Button */}
      

      {/* Logo Area */}
      <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-800">
        <Link href="/" className={`flex items-center ${isExpanded ? 'justify-start' : 'justify-center'}`}>
        <HiSparkles size={25}/>
          <span 
            className={` font-semibold text-gray-800 dark:text-white
              ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'} 
              transition-opacity duration-200`}
          >
            AI Feature Integration
          </span>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center p-3 rounded-lg transition-colors duration-200
                ${isExpanded ? 'justify-start' : 'justify-center'}
                ${isActive 
                  ? 'bg-purple-50 dark:bg-gray-800 text-purple-600 dark:text-purple-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800'
                }`}
            >
              <Icon 
                size={22} 
                className={`transition-colors duration-200
                  ${isActive 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400'
                  }`}
              />
              <span 
                className={`ml-3 whitespace-nowrap
                  ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'} 
                  transition-opacity duration-200`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

<button
        onClick={() => setIsExpanded(!isExpanded)}
        className=" flex items-center p-3 rounded-lg transition-colors duration-200 text-gray-600 dark:text-gray-400"
        aria-label={isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
      >
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      </nav>

      {/* Bottom Section */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800
        ${isExpanded ? 'flex items-center' : 'text-center'}`}>
        <div className={`flex items-center ${isExpanded ? 'space-x-3' : 'justify-center'}`}>
          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-gray-800 flex items-center justify-center">
            <Users size={18} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div className={`${isExpanded ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity duration-200`}>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">User Name</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;