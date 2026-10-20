<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$config = require __DIR__ . '/config.php';
try {
  $conn = new mysqli($config['host'], $config['user'], $config['senha'], $config['banco']);
  $conn->set_charset("utf8mb4");

} catch (mysqli_sql_exception $e) {
  error_log($e->getMessage());
  exit("Erro ao conectar ao banco.");
}