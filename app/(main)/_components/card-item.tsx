import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import React, { useEffect, useState } from 'react';

import dbFirebase from '@/firebase/config';
import { ref, set } from 'firebase/database';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { getLedStatus } from '@/firebase/firebase';

type Props = {
  title: string;
  description: string;
  type: 'slider' | 'button' | 'input' | 'switch';
};

// function getRandomInteger(min: number, max: number): number {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

const CardItem = ({ description, title, type }: Props) => {
  const router = useRouter();
  const [brightness, setBrightness] = useState<number[]>([50]);
  const [switchToggle, setSwitchToggle] = useState<boolean>(false);

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

  // const handleOnSwitchChange = async (value: boolean) => {
  //   setSwitchToggle(value);
  //   await set(ref(dbFirebase, '/led/switch'), value);
  // };

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

  useEffect(() => {
    const ledStatus = async () => {
      const status = await getLedStatus();
      console.log(status);
      if (status > 0) {
        setSwitchToggle(true);
      } else {
        setSwitchToggle(false);
      }
    };
    ledStatus();
  }, [brightness]);

  return (
    <div className="lg:p-0 p-4 w-full h-full flex justify-center">
      <Card className="lg:w-[600px] w-full h-[200px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {type === 'slider' && (
            <Slider
              defaultValue={brightness}
              value={brightness}
              max={100}
              step={1}
              onValueChange={handleOnValueChange}
            />
          )}
          {type === 'switch' && (
            <Switch
              checked={switchToggle}
              onCheckedChange={handleSwitchChange}
            />
          )}
        </CardContent>
        <CardFooter>
          {type === 'slider' && <div>Độ sáng: {brightness}</div>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardItem;
