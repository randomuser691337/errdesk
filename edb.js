function getp(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

document.addEventListener('DOMContentLoaded', function() {
    var errorSource = getp('e');
    if (errorSource) {
        dei(errorSource);
    } else {
        document.getElementById('error-info').innerText = "Error wasn't defined, or the error is unexplained.";
    }
});

const errordb = [
    { e: "1", info: "An error occurred while initializing the filesystem. Should be solvable by using a modern browser." },
    { e: "2", info: `An error occurred in the boot process. Can usually be fixed by erase, or by using a modern browser. Error details are provided: "${getp('d')}"` },
    { e: "3", info: `An error occurred while trying to log in. Can usually be fixed by erasing. Error details are provided: "${getp('d')}"` },
    { e: "4", info: `An error occurred while decrypting something. Can usually be fixed by restarting and logging in again. Error details are provided: "${getp('d')}"` },
    { e: "5", info: `An error occurred while trying to read a file. Can usually be fixed by restarting. Error details are provided: "${getp('d')}"` },
    { e: "6", info: `A system file is missing. Can be fixed by erasing. Error details are provided: "${getp('d')}"` },
    { e: "7", info: `WebDesk can't safely operate anymore. Error details are provided: "${getp('d')}"` },
];

function dei(errorSource) {
    document.getElementById('errn').innerText = errorSource;
    const error = errordb.find(errorObj => errorObj.e === errorSource);
    if (error) {
        document.getElementById('error-info').innerText = error.info;
    } else {
        document.getElementById('error-info').innerText = "Error not found in database. Probably an unknown panic, or you're on a beta build.";
    }
}