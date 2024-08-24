import { FaStar, FaStarHalf } from "react-icons/fa";

export const renderStars = (note: number) => {
    const int = Math.floor(note);
    const decimal = note - int;
    if (decimal === 0) {
        return Array.from({ length: int }, (_, i) => <FaStar key={i} />);
    } else {
        return Array.from({ length: int }, (_, i) => <FaStar key={i} />).concat(<FaStarHalf key={int} />);
    } 
};