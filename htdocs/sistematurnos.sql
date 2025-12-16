DROP DATABASE IF EXISTS SistemaTurnos;

CREATE DATABASE SistemaTurnos CHARACTER SET utf8mb4;

USE SistemaTurnos;

CREATE TABLE turno (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR(100) NOT NULL,
  fechahora datetime NOT NULL,
  motivo TEXT NOT NULL,
  tipomascota VARCHAR(20) NOT NULL,
  estado INT NOT NULL
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO turno (email, telefono, fechahora, motivo, tipomascota, estado) VALUES
('user1@example.com', '+34 612345678', '2025-02-05 09:00:00', 'Consulta general', 'Perro', 1),
('user2@example.com', '+34 698765432', '2025-02-05 11:00:00', 'Vacunación', 'Gato', 1),
('user3@example.com', '+34 655444333', '2025-02-06 14:30:00', 'Control de salud', 'Conejo', 1),
('user4@example.com', '+34 666777888', '2025-02-06 16:00:00', 'Chequeo anual', 'Perro', 1),
('user5@example.com', '+34 611222333', '2025-02-07 10:00:00', 'Consulta dermatológica', 'Gato', 1),
('user6@example.com', '+34 699888777', '2025-02-07 13:30:00', 'Vacunación', 'Otros', 1),
('user7@example.com', '+34 655666777', '2025-02-08 15:00:00', 'Problema digestivo', 'Perro', 1),
('user8@example.com', '+34 644333222', '2025-02-08 17:00:00', 'Vacunación', 'Gato', 1),
('user1@example.com', '+34 623789456', '2025-02-09 09:30:00', 'Consulta general', 'Conejo', 1),
('user2@example.com', '+34 687321654', '2025-02-09 11:15:00', 'Control de salud', 'Perro', 1),
('user3@example.com', '+34 631654987', '2025-02-10 14:45:00', 'Chequeo postoperatorio', 'Gato', 1),
('user4@example.com', '+34 641852963', '2025-02-10 16:20:00', 'Problema ocular', 'Ave', 1),
('user5@example.com', '+34 652963741', '2025-02-11 10:40:00', 'Consulta general', 'Perro', 1),
('user6@example.com', '+34 669258147', '2025-02-11 12:10:00', 'Control de salud', 'Gato', 1),
('user7@example.com', '+34 664987321', '2025-02-12 09:50:00', 'Vacunación', 'Perro', 1),
('user8@example.com', '+34 656789123', '2025-02-12 14:15:00', 'Chequeo dental', 'Gato', 1),
('user1@example.com', '+34 621987654', '2025-02-13 11:30:00', 'Problema digestivo', 'Conejo', 1),
('user2@example.com', '+34 659357258', '2025-02-13 16:45:00', 'Consulta general', 'Perro', 1),
('user3@example.com', '+34 651753852', '2025-02-14 10:20:00', 'Chequeo de piel', 'Gato', 1),
('user4@example.com', '+34 657159456', '2025-02-15 15:00:00', 'Vacunación', 'Ave', 1);




