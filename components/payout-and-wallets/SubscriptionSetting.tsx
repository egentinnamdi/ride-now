import React from "react";
import { TabsContent } from "../ui/tabs";
import { ScanEye } from "lucide-react";

export default function SubscriptionSetting() {
  return (
    <TabsContent
      value="subscription settings"
      className="p-10 flex justify-center  items-center gap-14"
    >
      <div className=" h-[70vh] flex flex-col  w-2/5">
        <h3 className="h-[9vh] text-2xl text-primary font-semibold ">
          Set subscription pricing
        </h3>
        <div className="flex-1 rounded-md  p-6 bg-background/10"></div>
      </div>
      <div className=" w-3/5 bg-background/10 h-[70vh]  px-20 gap-10 rounded-md border border-background justify-center items- flex flex-col ">
        <div className="flex text-primary items-center font-semibold gap-3 capitalize text-3xl">
          <ScanEye size={30} />
          <span className="text-gray-600">preview</span>
        </div>
        <div className=" h-2/4 rounded-2xl  p-6 flex flex-col  justify-between   shadow-[0_0_25px_rgba(0,0,0,0.15)] shadow-gray-200">
          <div className="space-y-2">
            <div className="flex capitalize text-gray-500 font-semibold  justify-between items-center">
              <span className="text-lg">monthly subscription</span>
              <span className="bg-pink-600 rounded-2xl text-white px-2 py-1  font-semibold">
                recommended
              </span>
            </div>
            <span className="text-primary text-3xl font-semibold">
              &#8358;{(8000).toLocaleString()}.00
            </span>
          </div>
          <div className="w-2/4 text-gray-400">
            <span className="text-xl  ">
              Pay a weekly fee and drive without charges.
            </span>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
