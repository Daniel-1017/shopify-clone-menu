import inquirer from "inquirer";

export const getUserInput = async prompts => {
    try {
        return await inquirer.prompt(prompts);
    } catch (err) {
        console.error(err);
    }
};
