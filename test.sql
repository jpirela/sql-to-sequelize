-- Test SQL con diferentes casos edge
CREATE TABLE test_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    count_field INT DEFAULT 0,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE simple_junction (
    table1_id INT,
    table2_id INT,
    PRIMARY KEY (table1_id, table2_id),
    FOREIGN KEY (table1_id) REFERENCES test_table(id),
    FOREIGN KEY (table2_id) REFERENCES test_table(id)
);
