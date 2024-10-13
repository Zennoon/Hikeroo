import DashboardSidebar from '@/components/u/dashboard_sidebar';
import DashboardNavbar from '@/components/u/dashboard_navbar';

export default function DashboardLayout({ children }) {
  return (
    <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
      <DashboardSidebar className='py'/>
      <DashboardNavbar>
        <main className='flex flex-col gap-4 p-4 lg:gap-6 bg-gray-50 h-full'>
          { children }
        </main>
      </DashboardNavbar>
    </div>
  );
}
