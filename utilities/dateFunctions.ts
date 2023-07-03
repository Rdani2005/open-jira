import { formatDistanceToNow } from "date-fns";

export const formatDistance = (date: number) => {
    const fromNow = formatDistanceToNow(date);
    return fromNow;
};
