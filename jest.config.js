module.exports = {
    cacheDirectory: './testCache' ,
    verbose: true ,
    bail: true ,
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    } ,
    testRegex: '(/__test__/.*|(\\.|/)spec)\\.(jsx?|tsx?)$' ,
    moduleFileExtensions: [
        'ts' ,
        'js'
    ]
};