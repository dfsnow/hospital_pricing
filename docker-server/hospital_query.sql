WITH closest AS (
    SELECT hospital_name, hospital_id, lon, lat 
    FROM hospitals
    WHERE hospital_id IN (SELECT DISTINCT(hospital_id) FROM prices)
    ORDER BY ST_Distance(geom, ST_SetSRID(
            ST_MakePoint($1, $2), 4326))
    LIMIT 3
    )
SELECT to_jsonb(result) AS properties 
FROM (
    SELECT * FROM closest a
    LEFT JOIN (
        SELECT hospital_id, price, description FROM (
            SELECT hospital_id, price, description,
                row_number() OVER (PARTITION BY hospital_id
                ORDER BY similarity(
                    LOWER(description),
                    LOWER($3)) DESC
                ) AS rank_filter
            FROM prices
            WHERE hospital_id IN (SELECT hospital_id FROM closest)
            AND price IS NOT NULL
            AND description IS NOT NULL) c
        WHERE rank_filter = 1) b
    ON a.hospital_id = b.hospital_id) result
