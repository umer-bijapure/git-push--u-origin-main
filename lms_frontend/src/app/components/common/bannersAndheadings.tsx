'use client';
import React, { ReactNode, useRef, useState } from "react";
import { Helmet } from "react-helmet";

interface CommonSectionTitleProps {
  title: string;
  titleColor: string;
  fontSize: string;
}

export const CommonSectionTitle: React.FC<CommonSectionTitleProps> = ({ title, titleColor, fontSize }) => {
  return (
    <div className="flex items-center justify-start pl-4 sm:pl-6 pb-2">
      <h1 className='text-[16px] md:text-[18px] text-[color:var(--mainTitleLightColor)]'>{title}</h1>
    </div>
  );
};



interface CommonHelmetProps {
  pageTitle: string;
  applicationTitle: string;
  favicon: string;
  language?: string;
}

export function CommonHelmet({
  pageTitle,
  applicationTitle,
  favicon,
  language,
}: CommonHelmetProps) {
  return (
    <Helmet htmlAttributes={{ lang: language ? language : "en" }}>
      <meta charSet="utf-8" />
      <title>
        {pageTitle} | {applicationTitle}
      </title>
      <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
      <meta name="description" content={`${applicationTitle} Application`} />
    </Helmet>
  );
}




















