import LaundryIcon from '@/components/shared/svg/laundry-icon';
import Link from 'next/link';
import React from 'react';

const OurServices = () => {
  const ourServices: { name: string; icon: any; link: string; _id: string }[] =
    [
      {
        name: 'Laundry',
        _id: '11',
        icon: <LaundryIcon className="size-14" />,
        link: '/services/laundry4',
      },
      {
        name: 'Laundry Phirmecy',
        _id: '12',
        icon: <LaundryIcon className="size-14" />,
        link: '/services/laundryh',
      },
      {
        name: 'Laundry',
        _id: '13',
        icon: <LaundryIcon className="size-14" />,
        link: '/services/laundryq',
      },
      {
        name: 'Laundry',
        _id: '343',
        icon: <LaundryIcon className="size-14" />,
        link: '/services/laundryt',
      },
      {
        name: 'Laundry',
        _id: '15',
        icon: <LaundryIcon className="size-14" />,
        link: '/services/laundryq',
      },
      {
        name: 'Laundry',
        _id: '18',
        icon: <LaundryIcon className="size-14" />,
        link: '/services/laundrys',
      },
    ];
  return (
    <div className="py-12">
      <div className="my-container">
        <p className="section-heading">Our Services</p>
        <div className="flex flex-wrap items-center justify-between gap-6">
          {ourServices.map((service) => (
            <div key={service._id}>
              <Link
                href={service.link}
                className="flex flex-col items-center justify-center gap-3"
              >
                <div>{service.icon}</div>
                <p className="sub-heading">{service.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
