#!/bin/bash

wasmtime build/index.wasm --preload moda=build/moda.wasm --wasm-features all