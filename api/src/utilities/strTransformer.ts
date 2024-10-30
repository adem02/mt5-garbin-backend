export const capitalizeFirstLetter = (str: string): string => {
    if (!str) return '';

    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const transformSubCategoryName = (name: string): string => {
    return name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};
