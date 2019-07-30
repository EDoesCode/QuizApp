#!/bin/bash

# for file in test*; do cp -a $file ./${file%%-*}-need; done
red='\e[1;31m%s\e[0m\n'
green='\e[1;32m%s\e[0m\n'
yellow='\e[1;33m%s\e[0m\n'
blue='\e[1;34m%s\e[0m\n'
magenta='\e[1;35m%s\e[0m\n'
cyan='\e[1;36m%s\e[0m\n'
end='\e[%s\e[0m\n'

printf "$yellow" "Testing api2/students/loginweb.php (Valid Credentials)"
curl -s -X POST "https://fullernetwork.com/api2/students/loginweb.php" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"email\":\"fuller.mark.e@gmail.com\",\"password\":\"welcome123\"}" > test01-got
DIFF=$(diff test01-got test01-need)
if [ "$DIFF" != "" ]
then 
  printf "$red" "    failed."  
else
  printf "$green" "    passed."
fi

printf "$yellow" "Testing api2/students/loginweb.php (Invalid Credentials)"
curl -s -X POST "https://fullernetwork.com/api2/students/loginweb.php" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"email\":\"fuller.mark.e@gmail.com\",\"password\":\"welcome\"}" > test02-got
DIFF=$(diff test02-got test02-need)
if [ "$DIFF" != "" ]
then 
  printf "$red" "    failed."  
else
  printf "$green" "    passed."
fi

printf "$yellow" "Testing api2/students/create.php (Duplicate email)" 
curl -s -X POST "https://fullernetwork.com/api2/students/create.php" -H "accept: */*" -H "Content-Type: application/json" -d "{\"firstname\":\"Mark\",\"lastname\":\"Fuller\",\"email\":\"fuller.mark.e@gmail.com\",\"password\":\"welcome123\",\"isAdmin\":false,\"challenge\":\"495286\",\"verified\":true}" > test03-got
DIFF=$(diff test03-got test03-need)
if [ "$DIFF" != "" ]
then 
  printf "$red" "    failed."  
else
  printf "$green" "    passed."
fi

printf "$yellow" "Testing api2/students/create.php (Unique email)" 
curl -s -X POST "https://fullernetwork.com/api2/students/create.php" -H "accept: */*" -H "Content-Type: application/json" -d "{\"firstname\":\"Mark\",\"lastname\":\"Fuller\",\"email\":\"fuller.mark.e@example.com\",\"password\":\"welcome123\",\"isAdmin\":false,\"challenge\":\"495286\",\"verified\":true}" > test04-got
DIFF=$(diff test04-got test04-need)
if [ "$DIFF" != "" ]
then 
  printf "$red" "    failed."  
else
  printf "$green" "    passed."
fi

printf "$yellow" "Testing api2/students/read.php"
curl -s -X GET "https://fullernetwork.com/api2/students/read.php" -H "accept: application/json" > test10-got
DIFF=$(diff test10-got test10-need)
if [ "$DIFF" != "" ]
then 
  printf "$red" "    failed."  
else
  printf "$green" "    passed."
fi

printf "$yellow" "Testing api2/exams/read.php"
curl -s -X GET "https://fullernetwork.com/api2/exams/read.php" -H "accept: application/json" > test20-got
DIFF=$(diff test20-got test20-need)
if [ "$DIFF" != "" ]
then 
  printf "$red" "    failed."  
else
  printf "$green" "    passed."
fi

printf "$yellow" "Testing api2/questions/read.php"
curl -s -X GET "https://fullernetwork.com/api2/questions/read.php" -H "accept: application/json" > test03-got
DIFF=$(diff test03-got test03-need)
if [ "$DIFF" != "" ]
then 
  printf "$red" "    failed."  
else
  printf "$green" "    passed."
fi
