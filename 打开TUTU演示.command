#!/bin/zsh
cd "$(dirname "$0")" || exit 1
echo "TUTU 纯前端预览：http://localhost:4174/"
echo "关闭终端即可停止静态预览。"
(sleep 1; open http://localhost:4174/) &
python3 -m http.server 4174 --bind 127.0.0.1
