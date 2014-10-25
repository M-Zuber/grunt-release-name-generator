grunt-release-name-generator
============================

> Grunt plugin that generates unique release names, Ubuntu-style (e.g. Distant Dragon, Wobbly Wren, etc...)

## Getting Started

### Install the plugin via Npm

```
$ npm install grunt-release-name-generator --save-dev
```

### Load the plugin within Grunt

```
grunt.loadNpmTasks('grunt-release-name-generator');
```

### Configure the plugin

Specify one or more Grunt targets within your Grunt config object. Global options are set under the `options` key and can be overriden on the target level.

```
grunt.config('release-name-generator', {
    'options': {
        'category': 'mammals'
    },
    'development': {
        'options': {
            'category': 'lizards'
        }
    },
    'production': {
    }
});
```

The output of running this task against all targets is shown below:

```
$ grunt release-name-generator
Running "release-name-generator:development" (release-name-generator) task

Generating release name for: development
>> Release name: Doting Dragon

Running "release-name-generator:production" (release-name-generator) task

Generating release name for: production
>> Release name: Monstrous Mouse

Done, without errors.
```

### Referencing release names within other tasks

Once run, the generated release names can be referenced within other tasks under the `global.release_name` property.