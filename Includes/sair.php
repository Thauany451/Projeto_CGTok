<?php
session_start();
session_destroy();
header('Location: ../Views/Questionario/login.php');
exit;