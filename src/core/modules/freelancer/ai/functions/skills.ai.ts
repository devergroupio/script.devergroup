import _ from "lodash";

export default (skills: string) => {
    const skillsArray = skills.split(",");
    const shuffleArray = _.shuffle(skillsArray);
    if (shuffleArray.length > 4) {
        return shuffleArray.slice(0, 3).join(",");
    }
    return shuffleArray.join(",");
};
