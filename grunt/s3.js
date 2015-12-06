module.exports = {
    options: {
        accessKeyId: '<%= aws.accessKeyId %>',
        secretAccessKey: '<%= aws.secretAccessKey %>',
        bucket: 'weather.enplug.net',
        cacheTTL: 0,
        overwrite: true
    },
    release: {
        cwd: 'dist/',
        src: ['**']
    }
};
