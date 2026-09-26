-- Active: 1764668125407@@127.0.0.1@3306@hosbank
CREATE DATABASE IF NOT EXISTS hosBank;
USE hosBank;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(30),

    role ENUM('CLIENT', 'CHARGE_CLIENT', 'ADMIN') NOT NULL,

    email_verified BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE email_verifications (
    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    token VARCHAR(255) NOT NULL UNIQUE,

    expires_at TIMESTAMP NOT NULL,

    verified_at TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE bank_accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    account_number VARCHAR(50) NOT NULL UNIQUE,
    type ENUM('CHECKING', 'SAVINGS') NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0.00,

    status ENUM('ACTIVE', 'BLOCKED', 'CLOSED') DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE beneficiaries (
    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    name VARCHAR(150) NOT NULL,
    account_number VARCHAR(50) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transfers (
    id INT PRIMARY KEY AUTO_INCREMENT,

    sender_account_id INT NOT NULL,
    beneficiary_id INT NOT NULL,

    amount DECIMAL(15,2) NOT NULL,
    description VARCHAR(255),

    status ENUM(
        'PENDING',
        'COMPLETED',
        'CANCELLED'
    ) DEFAULT 'PENDING',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (sender_account_id)
        REFERENCES bank_accounts(id),

    FOREIGN KEY (beneficiary_id)
        REFERENCES beneficiaries(id)
);

CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,

    account_id INT NOT NULL,
    transfer_id INT NULL,

    type ENUM(
        'DEPOSIT',
        'WITHDRAWAL',
        'TRANSFER'
    ) NOT NULL,

    amount DECIMAL(15,2) NOT NULL,
    description VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (account_id)
        REFERENCES bank_accounts(id),

    FOREIGN KEY (transfer_id)
        REFERENCES transfers(id)
);

CREATE TABLE cards (
    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,
    account_id INT NOT NULL,

    card_number VARCHAR(30) NOT NULL UNIQUE,

    type ENUM(
        'PHYSICAL',
        'VIRTUAL'
    ) NOT NULL,

    status ENUM(
        'ACTIVE',
        'BLOCKED',
        'OPPOSED',
        'EXPIRED'
    ) DEFAULT 'ACTIVE',

    expiration_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    FOREIGN KEY (account_id)
        REFERENCES bank_accounts(id)
);

CREATE TABLE bank_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    assigned_to INT NULL,

    type ENUM(
        'RIB',
        'SAVINGS_ACCOUNT',
        'VIRTUAL_CARD',
        'PIN_RECALCULATION',
        'CARD_OPPOSITION'
    ) NOT NULL,

    status ENUM(
        'PENDING',
        'IN_PROGRESS',
        'APPROVED',
        'REJECTED',
        'COMPLETED'
    ) DEFAULT 'PENDING',

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    FOREIGN KEY (assigned_to)
        REFERENCES users(id)
);



CREATE TABLE complaints (
    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    assigned_to INT NULL,

    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,

    status ENUM(
        'OPEN',
        'IN_PROGRESS',
        'RESOLVED',
        'CLOSED'
    ) DEFAULT 'OPEN',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    FOREIGN KEY (assigned_to)
        REFERENCES users(id)
);


CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    request_id INT NULL,
    complaint_id INT NULL,

    content TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    FOREIGN KEY (request_id)
        REFERENCES bank_requests(id),

    FOREIGN KEY (complaint_id)
        REFERENCES complaints(id)
);



CREATE TABLE interactions (
    id INT PRIMARY KEY AUTO_INCREMENT,

    client_id INT NOT NULL,
    employee_id INT NOT NULL,

    type VARCHAR(100) NOT NULL,
    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (client_id)
        REFERENCES users(id),

    FOREIGN KEY (employee_id)
        REFERENCES users(id)
);