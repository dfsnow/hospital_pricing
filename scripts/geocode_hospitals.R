library(tidyverse)
library(ggmap)

hospitals <- read_tsv("data/hospitals.tsv") %>% 
  mutate_geocode(hospital_name) %>%
  write_csv("data/hospitals.csv")

