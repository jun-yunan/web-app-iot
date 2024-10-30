'use client';

import React from 'react';

// import CardItem from '../_components/card-item';
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  // CardHeader,
  // CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

import dbFirebase from '@/firebase/firebaseConfig';
import { ref, set } from 'firebase/database';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
// import Image from 'next/image';
// import { getLedStatus } from '@/firebase/firebase';

// type Props = {}

const Dashboard = () => {
  const router = useRouter();
  const [brightness, setBrightness] = useState<number[]>([50]);
  const [switchToggle, setSwitchToggle] = useState<boolean>(true);

  const handleOnValueChange = async (value: number[]) => {
    setBrightness(value);
    await set(ref(dbFirebase, '/led/brightness'), value[0]);
    if (value[0] === 0) {
      await set(ref(dbFirebase, '/led/switch'), false);
      setSwitchToggle(false);
      router.refresh();
    } else {
      await set(ref(dbFirebase, '/led/switch'), true);
      setSwitchToggle(true);
      router.refresh();
    }
  };

  const handleSwitchChange = async (value: boolean) => {
    setSwitchToggle(value);
    if (value === false) {
      await set(ref(dbFirebase, '/led/brightness'), 0);
      setBrightness([0]);
      router.refresh();
    } else {
      await set(ref(dbFirebase, '/led/brightness'), 50);
      setBrightness([50]);
      router.refresh();
    }
  };

  return (
    <div className="lg:p-12 w-full h-full flex-col flex items-center justify-center  bg-neutral-800">
      <Card className="lg:w-[600px] w-full h-full bg-[#324539] text-white">
        <CardContent className="flex flex-col gap-10">
          <div className="self-end relative flex flex-col items-center">
            <Image
              src="/images/lamp.png"
              width={200}
              height={327}
              alt="Light"
              className="z-10"
            />

            {switchToggle && brightness[0] > 0 ? (
              <>
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-yellow-300 blur-2xl opacity-30"></div>

                <div className="absolute z-20 bottom-2 bg-yellow-50 w-[80px] h-[30px] rounded-br-full rounded-bl-full blur-sm opacity-70"></div>
              </>
            ) : (
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-neutral-800 blur-2xl opacity-30"></div>
            )}
          </div>

          <div className="flex flex-col gap-y-10 mt-6">
            <div className="flex items-center gap-x-2 gap-y-10">
              <Switch
                checked={switchToggle}
                onCheckedChange={handleSwitchChange}
                className="shadow-lg"
              />
              <Label>{switchToggle ? 'ON' : 'OFF'}</Label>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Light Intensity</Label>
              <div className="flex items-center justify-around">
                <Image
                  src="/images/Vector1.png"
                  width={34}
                  height={34}
                  alt="Light"
                  className="z-10"
                />
                <Slider
                  defaultValue={brightness}
                  value={brightness}
                  max={100}
                  step={1}
                  onValueChange={handleOnValueChange}
                />
                <Image
                  src="/images/icons8_light 2.png"
                  width={34}
                  height={34}
                  alt="Light"
                  className="z-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div>Độ sáng: {brightness}</div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
