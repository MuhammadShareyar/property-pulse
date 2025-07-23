"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/actions/getUnreadMessageCount";

const MessageCountContext = createContext();

export function MessageCountProvider({ children }) {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  const {data: session} = useSession();

  useEffect(()=>{
    if(session && session.user){
        getUnreadMessageCount().then((res)=>{
             setUnreadMessageCount(res.count);
        })
    }
  },[getUnreadMessageCount,session]);

  return (
    <MessageCountContext.Provider
      value={{ unreadMessageCount, setUnreadMessageCount }}
    >
      {children}
    </MessageCountContext.Provider>
  );
}

export function useMessageCountContext() {
  return useContext(MessageCountContext);
}
