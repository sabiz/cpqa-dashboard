{
"targets": [
     {
        "target_name": "Mut",
        "cflags!": [ "-fno-exceptions" ],
        "cflags_cc!": [ "-fno-exceptions" ],
        "defines":["FTD2XX_EXPORTS"],
        "sources": [ "src/native/mut.cc" ],
        "include_dirs": [
            "<!@(node -p \"require('node-addon-api').include\")",
            "<(module_root_dir)/src/native/external/include"
        ],
        "conditions":  [
            ["OS=='win'", {
                "link_settings": {
                    "conditions" : [
                        ["target_arch=='ia32'", {
                            "libraries": [
                                "-l<(module_root_dir)/src/native/external/lib/FTD2XX/i386/ftd2xx.lib"
                            ]
                        }],
                        ["target_arch=='x64'", {
                            "libraries": [
                                "-l<(module_root_dir)/src/native/external/lib/FTD2XX/amd64/ftd2xx.lib"
                            ]
                        }]
                    ]
                },
                "msvs_settings": {
                    "VCCLCompilerTool": { "ExceptionHandling": 1 }
                }
            }],
            ["OS!='win'", {
                "link_settings": {
                    "libraries": [
                        "-lftd2xx"
                    ]
                }
            }]
        ],
        "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
     }
   ]
 }
