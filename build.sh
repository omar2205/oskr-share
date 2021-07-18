#!/usr/bin/bash
rm -rf dist/*
pnpm build
cd dist
cp index.html 200.html
echo "DOMAIN" > CNAME
surge .
