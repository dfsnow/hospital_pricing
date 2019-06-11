#!/bin/bash

awk 'FNR==1 && NR!=1{next;}{print}' $(ls raw/*/data-latest.tsv) | \
    awk 'BEGIN { FS="\t"; OFS="," } {
      rebuilt=0
      for(i=1; i<=NF; ++i) {
        if ($i ~ /,/ && $i !~ /^".*"$/) { $i = "\"" $i "\""; rebuilt=1 }
      }
      if (!rebuilt) { $1=$1 }
      print
    }' | \
    cut -d, -f5,1 --complement > \
    data/data-latest-all.csv
