#!/bin/bash

source config.sh

awk 'FNR==1 && NR!=1{next;}{print}' $(ls $proj_dir/raw/*/data-latest.tsv) | \
    awk 'BEGIN { FS="\t"; OFS="|" } {
      rebuilt=0
      for(i=1; i<=NF; ++i) {
        if ($i ~ /,/ && $i !~ /^".*"$/) { $i = "\"" $i "\""; rebuilt=1 }
      }
      if (!rebuilt) { $1=$1 }
      print
    }' | \
    cut -d\| -f1 --complement | \
    tr -d '$' | tr -d '"' | \
    sed '/^[[:digit:]]/!d' | \
    sed '/[[:digit:]]/ {s/,//g}' > \
    $proj_dir/data/data-latest-all.csv
