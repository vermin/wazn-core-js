#!/bin/sh

bin/build-emcpp.sh &&
cp build/WazniyaCoreCpp_WASM.js wazn_utils/; 
cp build/WazniyaCoreCpp_WASM.wasm wazn_utils/;
cp build/WazniyaCoreCpp_ASMJS.js wazn_utils/; 
cp build/WazniyaCoreCpp_ASMJS.asm.js wazn_utils/ 