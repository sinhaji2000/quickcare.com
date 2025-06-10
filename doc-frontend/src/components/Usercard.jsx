import React from "react";
import { useSelector } from "react-redux";



const Usercard = ({appointment}) => {

    const appointments = useSelector((state) => state.todayAppointments.appointments);
    // console.log(appointments[0].userId.name)
    // console.log(appointments)

    console.log(appointment)

    const avatarUrl = appointment.userId.profilePic
        ? `http://localhost:3001/${appointment.userId.profilePic}`
        : "https://lh3.googleusercontent.com/aida-public/AB6AXuAJSnnp3YRjy8gtLAA2HHf65L2tpQgGyMhc49hLX1JVe-7_3Wx_RCUpvwY5SMinrBczAjug0xLgLBouBDGRve8LwVD0iommKZr-aRihJGZ9Op-KCTwicoysqEz43OvtlqnmEt5ur8y7lIpnJk5_Kja42ooSbG3S7XN-xb3KpF4Ane07Vajh13ESJkxEkByPmrBQ7qudb9DPVlsjYCrtWqtAQ3x0mF0sZbMwtwePCTlkZxtCcUP9sR0_oBgb_B05progqZR0L4yd5o1j"; // Fallback image if no profile picture is available
    
    return (

         <div className="p-4">
                        <div className="flex items-stretch justify-between gap-4 rounded-xl">
                            <div className="flex flex-[2_2_0px] flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <p className="text-[#111518] text-base font-bold leading-tight">{appointment.userId.name}</p>
                                    <p className="text-[#60768a] text-sm font-normal leading-normal">{appointment.timeSlot}</p>
                                </div>
                                <button
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-fit"
                                >
                                    <span className="truncate">View Details</span>
                                </button>
                            </div>
                            <div
                                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                                style={{ backgroundImage: `url("${avatarUrl}")` }}
                            ></div>
                        </div>
                    </div>
    )
}

export default Usercard;