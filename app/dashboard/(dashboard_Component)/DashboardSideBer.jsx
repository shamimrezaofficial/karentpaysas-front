'use client';

import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdSpaceDashboard, MdAccountBalanceWallet, MdPayments, MdAccountBalance, MdBalance,  } from 'react-icons/md';
import { FaMoneyCheckAlt, FaHandsHelping } from 'react-icons/fa';
import { HiDocumentReport } from 'react-icons/hi';
import { IoSettings } from 'react-icons/io5';
import { MdDeveloperMode } from 'react-icons/md';
import useFetchingData from '@/app/lib/useFetchingData';


function DashboardSideBer() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const token = Cookies.get('auth_token_font');
  const pathname = usePathname();
  const router = useRouter();

  const redirect = (path) => {
    router.push(path);
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!token) {
      redirect('/auth/login');
    }
  }, [token, router]);

  const [isGradient, setIsGradient] = useState(false);
  const { fetchData } = useFetchingData('/api/front/setting/color-setting');
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');

  useEffect(() => {
    if (
      fetchData?.settings?.GradientColor1 &&
      fetchData?.settings?.GradientColor2
    ) {
      setColor1(fetchData.settings.GradientColor1);
      setColor2(fetchData.settings.GradientColor2);
      setIsGradient(true);
    } else {
      setColor1('');
      setColor2('');
      setIsGradient(false);
    }
  }, [fetchData]);


  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const menuItems = [
    { href: '/dashboard',active: pathname === '/dashboard', icon: <MdSpaceDashboard className='mr-2 text-2xl' />, label: 'Dashboard' },
    { href: '/dashboard/cash-in', active: pathname === '/dashboard/cash-in', icon: <MdAccountBalanceWallet className='mr-2 text-2xl' />, label: 'Deposit' },
    { href: '/dashboard/payout', active: pathname === '/dashboard/payout', icon: <FaMoneyCheckAlt className='mr-2 text-2xl' />, label: 'Payout' },
    { href: '/dashboard/settlement', active: pathname === '/dashboard/settlement', icon: <MdBalance   className='mr-2 text-2xl' />, label: 'Settlement' },
    { href: '/dashboard/payments', active: pathname === '/dashboard/payments', icon: <MdPayments className='mr-2 text-2xl' />, label: 'Payments' },
    { href: '/dashboard/statement', active: pathname === '/dashboard/statement', icon: <MdAccountBalance className='mr-2 text-2xl' />, label: 'Statement Balance' },
    { href: '/dashboard/developer', active: pathname === '/dashboard/developer', icon: <MdDeveloperMode className='mr-2 text-2xl' />, label: 'Developer' },
    { href: '/dashboard/support', active: pathname === '/dashboard/support', icon: <FaHandsHelping className='mr-2 text-2xl' />, label: 'Support' },
    { href: '/dashboard/reports', active: pathname === '/dashboard/reports', icon: <HiDocumentReport className='mr-2 text-2xl' />, label: 'Reports' },
    { href: '/dashboard/settings', active: pathname === '/dashboard/settings', icon: <IoSettings className='mr-2 text-2xl' />, label: 'Settings' }
  ];
  return (
    <div
      className={`hidden lg:block lg:w-[300px] mr-5 mt-10 rounded-md ${isGradient ? 'text-gray-200' : 'text-gray-800'}`}
      style={{
        background: isGradient
          ? `linear-gradient(to bottom, ${color1 || '#3b82f6'}, ${color2 || '#9333ea'})`
          : '#ffffff'
      }}
    >
      <aside className='px-4 mt-5'>
        <ul>
          {menuItems.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={item?.active}
          />
        ))}
      </ul>
    </aside>
    </div>
  );
}

function MenuItem({ href, icon, label, active, onClick }) {
  return (
    <li
      className={`mb-4 cursor-pointer flex items-center rounded-md transition-transform duration-200 ${active
        ? 'bg-gradient-to-r from-blue-600 to-purple-400'
        : 'hover:bg-gradient-to-r from-blue-600 to-purple-400'
        }`}
    >
      <Link href={href} onClick={onClick} className='flex items-center p-2 w-full' prefetch={false}>
        {icon}
        <span className='ml-2 text-sm font-medium'>{label}</span>
      </Link>
    </li>
  );
}

export default DashboardSideBer;