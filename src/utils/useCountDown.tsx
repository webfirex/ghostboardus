'use client'
import { useEffect, useState } from 'react';

function useCountdown(eventUtcTime: string) {
    const [countdown, setCountdown] = useState<string>("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const eventDate = new Date(eventUtcTime + 'Z'); // Convert to Date object in UTC

            // Convert the event time to EST (UTC-5)
            const utcOffset = eventDate.getTimezoneOffset(); // in minutes
            const estOffset = utcOffset + 300; // EST is UTC-5 (5 * 60 = 300 minutes)
            const estEventDate = new Date(eventDate.getTime() - estOffset * 60 * 1000);

            // Calculate the difference
            const difference = estEventDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(intervalId);
                setCountdown("Ended");
                return;
            }

            // Calculate remaining days, hours, and minutes
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

            // Update the countdown state
            setCountdown(`${days}d ${hours}h ${minutes}m left`);
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [eventUtcTime]);

    return countdown;
}

export default useCountdown;
