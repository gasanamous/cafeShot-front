import React from 'react'
import { useSiteSettings } from '../../Contexts/SiteSettingsContext';

function GeneralInfo() {
  const { siteSettings, updateSetting } = useSiteSettings();

  return (
    <div className="space-y-4 p-4 txt4">
      <span className=" font-bold">Site Name</span>
      <input
        className="w-full p-2 border rounded txt3"
        value={siteSettings.siteName}
        onChange={(e) => updateSetting("siteName", e.target.value)}
      />
      <div className="grid md:grid-cols-3 gap-3">
        <div className="flex justify-center items-center gap-2">
          <span className=" font-bold">phoneNumber</span>
          <input
            className="w-full p-2 border rounded txt3"
            value={siteSettings.phoneNumber}
            onChange={(e) => updateSetting("phoneNumber", e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className=" font-bold">Location</span>
          <input
            className="w-full p-2 border rounded txt3 txt3"
            type="tel"
            value={siteSettings.Location}
            onChange={(e) => updateSetting("Location", e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className=" font-bold">email</span>
          <input
            className="w-full p-2 border rounded txt3"
            type="email"
            value={siteSettings.email}
            onChange={(e) => updateSetting("email", e.target.value)}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex justify-center items-center gap-2">
          <span className=" font-bold">facebook Link</span>
          <input
            className="w-full p-2 border rounded txt3"
            value={siteSettings.facebookLink}
            onChange={(e) => updateSetting("facebookLink", e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className=" font-bold">insta Link</span>
          <input
            className="w-full p-2 border rounded txt3"
            value={siteSettings.instaLink}
            onChange={(e) => updateSetting("instaLink", e.target.value)}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex justify-center items-center gap-2">
          <span className=" font-bold">openAt</span>
          <input
            className="w-full p-2 border rounded txt3"
            type="time"
            value={siteSettings.openAt}
            onChange={(e) => updateSetting("openAt", e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className=" font-bold">closedAt</span>
          <input
            className="w-full p-2 border rounded txt3"
            type="time"
            value={siteSettings.closedAt}
            onChange={(e) => updateSetting("closedAt", e.target.value)}
          />
        </div>
      </div>
      <h2 className="text-xl font-bold">Edit About Us</h2>
      <textarea
        className="w-full h-40 p-2 border rounded txt3"
        value={siteSettings.aboutUs}
        onChange={(e) => updateSetting("aboutUs", e.target.value)}
      />
      <h2 className="text-xl font-bold">Edit Menu Introduction</h2>
      <textarea
        className="w-full h-32 p-2 border rounded txt3"
        value={siteSettings.menuIntro}
        onChange={(e) => updateSetting("menuIntro", e.target.value)}
      />
      <h2 className="text-xl font-bold">Edit Location Note</h2>
      <textarea
        className="w-full h-32 p-2 border rounded txt3"
        value={siteSettings.locationNote}
        onChange={(e) => updateSetting("locationNote", e.target.value)}
      />
      <h2 className="text-xl font-bold">Edit Coffee Sourcing Text</h2>
      <textarea
        className="w-full h-32 p-2 border rounded txt3"
        value={siteSettings.sourcingText}
        onChange={(e) => updateSetting("sourcingText", e.target.value)}
      />
    </div>
  );
}

export default GeneralInfo