angular.module('todoApp', ['ui.router'])
    .controller('TodoListController', function ($state, $http, $rootScope, $scope) {
        var todoList = this
        if ($rootScope.loggedIn == undefined)
            $rootScope.loggedIn = false;
        if ($rootScope.currentAccount == undefined)
            $rootScope.currentAccount = ''
        if ($rootScope.currentAccountID == undefined)
            $rootScope.currentAccountID = -1
        if ($rootScope.enrolledCourses == undefined)
            $rootScope.enrolledCourses = []
        if ($rootScope.accounts == undefined)
            $rootScope.accounts = [{
                email: 'win3455@hotmail.com',
                password: 'admin',
                studentID: 'admin',
                address: '',
                province: 'Bangkok',
                zip: '10230',
                firstName: 'Varis',
                lastName: 'Kritpolchai',
                phoneNum: '02-944-5415',
                mobileNum: '090-983-9367',
                birthdate: '15/07/95',
                courses: []
            }]
        if ($rootScope.tempEnrollCourse == undefined)
            $rootScope.tempEnrollCourse = ''
        if ($rootScope.tempCourse == undefined)
            $rootScope.tempCourse = {}
        if ($rootScope.tempDropCourse == undefined)
            $rootScope.tempDropCourse = ''

        $http.get('src/list.json')
        .success(function(data) {
            $rootScope.courses = data;
        })

        $rootScope.login = function() {
            console.log('login');
            var userid = angular.element($('#id')).val();
            var password = angular.element($('#password')).val();
            console.log($rootScope.accounts.length);
            for (var i = 0; i < $rootScope.accounts.length; i++)
            {
                if (userid == $rootScope.accounts[i].studentID && password === $rootScope.accounts[i].password)
                {
                    $rootScope.currentAccount = userid;
                    $rootScope.currentAccountID = i;
                    $rootScope.loggedIn = true;
                    $state.go('addcourse');
                    console.log($rootScope.currentAccount);
                }
                else
                {
                    console.log('wrong id or password');
                }
            }
        }

        $rootScope.logout = function() {
            console.log('logout');
            $rootScope.currentAccount = '';
            $rootScope.currentAccountID = -1;
            $rootScope.loggedIn = false;
        }

        $rootScope.enroll = function() {
            console.log('enroll');
            console.log($rootScope.tempCourse);
            $rootScope.accounts[$rootScope.currentAccountID].courses.push($rootScope.tempCourse);
            $rootScope.tempEnrollCourse = '';
            $rootScope.tempCourse = {};
        }

        $rootScope.tempEnroll = function(course) {
            console.log('tempEnroll');
            $rootScope.tempEnrollCourse = course.id + ' ' + course.name.en;
            console.log($rootScope.tempEnrollCourse);
            $rootScope.tempCourse = course;
        }

        $rootScope.drop = function() {
            console.log('drop');
            console.log($rootScope.tempCourse);
            for (var i = 0; i < $rootScope.accounts[$rootScope.currentAccountID].courses.length; i++)
            {
                if ($rootScope.tempCourse === $rootScope.accounts[$rootScope.currentAccountID].courses[i])
                    $rootScope.accounts[$rootScope.currentAccountID].courses.splice(i, 1);
            }
            $rootScope.tempCourse = {};
        }

        $rootScope.tempDrop = function(course) {
            console.log("tempDrop");
            $rootScope.tempDropCourse = course.id + ' ' + course.name.en;
            console.log($rootScope.tempDropCourse);
            $rootScope.tempCourse = course;
        }

        $rootScope.register = function(event) {
            console.log('register');
            if (angular.element($('#email1')).val() === angular.element($('#email2')).val() &&
                angular.element($('#password1')).val() === angular.element($('#password2')).val() &&
                angular.element($('#password1')).val().length >= 8 &&
                angular.element($('#studentID')).val().length == 10)
            {
                var newAccount = {
                    email: angular.element($('#email1')).val(),
                    password: angular.element($('#password1')).val(),
                    studentID: angular.element($('#studentID')).val(),
                    address: angular.element($('#address')).val(),
                    province: angular.element($('#province')).val(),
                    zip: angular.element($('#zip')).val(),
                    firstName: angular.element($('#firstName')).val(),
                    lastName: angular.element($('#lastName')).val(),
                    phoneNum: angular.element($('#phoneNum')).val(),
                    mobileNum: angular.element($('#mobileNum')).val(),
                    birthdate: angular.element($('#birthdate')).val(),
                    courses: []
                }
                console.log(newAccount)
                $rootScope.currentAccount = newAccount.studentID;
                $rootScope.currentAccountID = $rootScope.accounts.length;
                $rootScope.accounts.push(newAccount);
                $rootScope.loggedIn = true;
                console.log($rootScope.accounts);
                console.log('registered successfully');
                $state.go('addcourse');
            }
            else
                console.log('registered failed');
        }

        $rootScope.clearField = function() {
            console.log('clearField');
            $rootScope.storeEvent.email1 = null;
            $rootScope.storeEvent.email2 = null;
            $rootScope.storeEvent.password1 = null;
            $rootScope.storeEvent.password2 = null;
            $rootScope.storeEvent.studentID = null;
            $rootScope.storeEvent.address = null;
            $rootScope.storeEvent.province = null;
            $rootScope.storeEvent.zip = null;
            $rootScope.storeEvent.firstName = null;
            $rootScope.storeEvent.lastName = null;
            $rootScope.storeEvent.phoneNum = null;
            $rootScope.storeEvent.mobileNum = null;
            $rootScope.storeEvent.birthdate = null;
        }

        $rootScope.storeClear = function(event) {
            console.log('storeClear');
            $rootScope.storeEvent = event;
        }
    })
