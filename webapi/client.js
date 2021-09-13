import CDP from 'chrome-remote-interface';

export const getClient = async () => {
    return await CDP();
}
