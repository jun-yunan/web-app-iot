import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// type Props = {}

const Logo = () => {
    return (
        <Link href="./dashboard">
            <Image src="./logo.svg" alt="LOGO" width={32} height={32} quality={100}/>
        </Link>
    );
};

export default Logo;
