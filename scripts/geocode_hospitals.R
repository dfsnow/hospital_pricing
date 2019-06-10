library(tidyverse)
library(ggmap)

hospitals <- read_tsv("data/hospitals.tsv") %>% 
  mutate_geocode(hospital_name)

