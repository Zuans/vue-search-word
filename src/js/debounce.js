module.exports = function (func, delay) {
    let timeout;
    const exe = () => {
        func();
    }
    clearTimeout(timeout);
    timeout = setTimeout(exe, delay);
}