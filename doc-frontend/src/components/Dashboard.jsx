import Usercard from "./Usercard";

import useDashboard from "../hooks/useDashboard";
import SideBar from "./SideBar";


const Dashboard = () => {
  const appointments = useDashboard();

  if (!appointments.length) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <SideBar />

          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Today's Appointments
              </p>
            </div>
            {appointments.map((appointment) => (
              <Usercard key={appointment._id} appointment={appointment} I />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
