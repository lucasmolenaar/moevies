export default function substring(content) {
    let sub = '';
    if (content) {
        sub = content.substr(0, 300);
    }

    return sub;
}
