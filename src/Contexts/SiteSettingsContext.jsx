import React, { createContext, useContext, useState } from "react";

const SiteSettingsContext = createContext();

export const SiteSettingsProvider = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState({
    siteName: "Cafe Shot",
    aboutUs: `In the heart of the city, where footsteps echo and stories unfold with every passing hour, we built more than just a café — we built a sanctuary. Amidst the swirl of urban chaos, our space offers a pause, a breath, a sip of something warm and genuine. Here, coffee is not just a drink — it is a ritual. We source our beans from sustainable farms, roast them with precision, and serve them with a smile that says: "You're home now." Designed with warmth and intention, our café is a blend of rustic wood, soft lighting, and cozy corners. It’s a place where time slows down, conversations deepen, and inspiration flows as freely as the espresso.`,
    locationNote: `Whether you’re chasing a deadline, catching up with an old friend, or simply sitting in silence, our café is your companion in the rhythm of life.`,
    sourcingText: `We select coffee beans from sustainable farms around the world and roast them expertly in our own roastery, so they arrive fresh and aromatic.`,
    menuIntro: `From strong espressos to warming lattes, we offer a selection of hot and cold beverages, as well as freshly baked goods to make your day. Explore our menu and taste the difference.`,
    phoneNumber: "0599123456",
    Location: "Rawabi Asal",
    email: "coffee122@gmail.com",
    openAt: "10:00",
    closedAt: "22:00",
    facebookLink: "https://www.facebook.com/cafeshot",
    instaLink: "https://www.instagram.com/cafeshot",
  });

  const updateSetting = (key, value) => {
    setSiteSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <SiteSettingsContext.Provider value={{ siteSettings, updateSetting }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};
export function formatTime12Hour(time24) {
  if (!time24) return "";
  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")} ${ampm}`;
}

export const useSiteSettings = () => useContext(SiteSettingsContext);
