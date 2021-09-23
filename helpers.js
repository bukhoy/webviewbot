export class Helpers {
    formatDate = () => {
        return new Date()
            .toLocaleString("ru-RU")
            .replace(/[/\\?%*:|"<>]/g, "-");
    };
}
