<?php
require("../../controllers/user.controller.php");
if(login()) echo "true";
else echo "false";