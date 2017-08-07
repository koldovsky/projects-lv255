var app = angular.module('GroupApp', ['ngMaterial']);

// https://stackoverflow.com/a/16349631
app.directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});

app.controller('AppCtrl', ['$scope', '$mdSidenav', 'studentService', function ($scope, $mdSidenav, studentService) {
    var allStudents = [];


    $scope.subgroups = [1, 2];
    $scope.selectedsubgroups = [1, 2];
    $scope.isChosenOnly = false;
    //$scope.toggle = function (item, list) {
    //  var idx = list.indexOf(item);
    //  if (idx >-1) {
    //    list.splice(idx, 1);
    //  } else {
    //    list.push(item);
    //  }
    //};
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    $scope.toggleChosen = function (item) {
        $scope.isChosenOnly = !$scope.isChosenOnly;
    };
    //$scope.filterBySubgroup = function (student) {
    //  return $scope.exists(student.subgroup, $scope.selectedsubgroups);
    //};

    $scope.filterByChosen = function (student) {
        if ($scope.isChosenOnly) {
            if (student.isChosenProject) {
                console.log(student);
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    $scope.filterByData = function (student) {
        if (!student.websiteUrl || !student.codeSourceUrl) {
            return false;
        }
        return true;
    }

    $scope.selected = null;
    $scope.students = allStudents;
    $scope.selectStudent = selectStudent;
    $scope.toggleSidenav = toggleSidenav;

    loadStudents();

    function loadStudents() {
        studentService.loadAll()
            .then(function (students) {
                allStudents = students;
                $scope.students = [].concat(students);
                $scope.selected = $scope.students[0];
            })
    }

    function toggleSidenav(name) {
        $mdSidenav(name).toggle();
    }

    function selectStudent(student) {
        $scope.selected = angular.isNumber(student) ? $scope.students[student] : student;
        $scope.toggleSidenav('left');
    }

}]);

app.service('studentService', ['$q', function ($q) {

    //! http://www.convertcsv.com/csv-to-json.htm
    // http://www.csvjson.com/csv2json
    var students = [
        {
            "name": "Andriy Chernetskyy",
            "websiteUrl": "https://andrew179.github.io/myproject/",
            "codeSourceUrl": "https://github.com/andrew179/myproject",
            "cvUrl": "",
            "photo": "images/students/chernetskyy.jpg"
        },
        {
            "name": "Anna Budim",
            "websiteUrl": "https://annabudim.github.io/kitchen/",
            "codeSourceUrl": "https://github.com/AnnaBudim/kitchen.git",
            "cvUrl": "",
            "photo": "images/students/budim.jpg"
        },
        {
            "name": "Bohdan Melenchuk",
            "websiteUrl": "https://bsod-404.github.io/project-latealpha/",
            "codeSourceUrl": "https://github.com/BSOD-404/project-latealpha",
            "cvUrl": "",
            "photo": "images/students/melenchuk.jpg"
        },
        {
            "name": "Mariia Klymenko",
            "websiteUrl": "https://mashaklimenko.github.io/my-own-page/",
            "codeSourceUrl": "https://github.com/MashaKlimenko/my-own-page",
            "cvUrl": "",
            "photo": "images/students/klymenko.jpg"
        },
        {
            "name": "Mykhailo Odrekhivs'kyi",
            "websiteUrl": "https://skipokylas.github.io/layout-html-css/",
            "codeSourceUrl": "https://github.com/skipokylas/layout-html-css",
            "cvUrl": "",
            "photo": "images/students/odrekhivs'kyi.jpg"
        },
        {
            "name": "Myroslav Martsin",
            "websiteUrl": "https://marcin2001.github.io/Kurs/kurs.html",
            "codeSourceUrl": "https://github.com/marcin2001/Kurs",
            "cvUrl": "https://www.linkedin.com/in/myroslav-martsin-413b17148/",
            "photo": "images/students/martsin.jpg"
        },
        {
            "name": "Oleksandr Onyshko",
            "websiteUrl": "https://banderovez.github.io/sertificat/",
            "codeSourceUrl": "https://github.com/Banderovez/sertificat",
            "cvUrl": "",
            "photo": "images/students/onyshko.jpg"
        },
        {
            "name": "Roman Tulchak",
            "websiteUrl": "https://romantulchak.github.io/tourism/",
            "codeSourceUrl": "https://github.com/romantulchak/tourism",
            "cvUrl": "",
            "photo": "images/students/tulchak.jpg"
        },
        {
            "name": "Taras Kudimov",
            "websiteUrl": "https://ragist.github.io/bot/",
            "codeSourceUrl": "https://github.com/ragist/bot",
            "cvUrl": "",
            "photo": "images/students/kudimov.jpg"
        },
        {
            "name": "Taras Struk",
            "websiteUrl": "https://tarassito.github.io/aboutme/",
            "codeSourceUrl": "https://github.com/tarassito/aboutme",
            "cvUrl": "https://www.linkedin.com/in/taras-struk-5a997230/",
            "photo": "images/students/struk.jpg"
        },
        {
            "name": "Tetiana Hoidyk",
            "websiteUrl": "https://thoydyk95.github.io/resume-tetiana/",
            "codeSourceUrl": "https://thoydyk95.github.io/resume-tetiana/",
            "cvUrl": "",
            "photo": "images/students/hoidyk.jpg"
        },
        {
            "name": "Vadym Gryn",
            "websiteUrl": "https://ophilus.github.io/personal-page/",
            "codeSourceUrl": "https://github.com/Ophilus/personal-page",
            "cvUrl": "https://www.linkedin.com/in/vadim-gryn-029734140",
            "photo": "images/students/gryn.jpg"
        },
        {
            "name": "Yurii Petrichenko",
            "websiteUrl": "https://madebyspeedster.github.io/pr1/",
            "codeSourceUrl": "https://github.com/madebyspeedster/pr1/",
            "cvUrl": "",
            "photo": "images/students/petrichenko.jpg"
        },
        {
            "name": "Nazar Kyrychenko",
            "websiteUrl": "https://weindor.github.io/projectinspirationtocode/",
            "codeSourceUrl": "https://github.com/weindor/projectinspirationtocode/",
            "cvUrl": "https://www.linkedin.com/in/%D0%BD%D0%B0%D0%B7%D0%B0%D1%80-%D0%BA%D0%B8%D1%80%D0%B8%D1%87%D0%B5%D0%BD%D0%BA%D0%BE-22b00811a/",
            "photo": "images/students/kyrychenko.jpg"
        },
        {
            "name": "Oksana Svyryd",
            "websiteUrl": "https://oksana951.github.io/trip-to-lviv1/",
            "codeSourceUrl": "https://github.com/Oksana951/trip-to-lviv1",
            "cvUrl": "",
            "photo": "images/students/svyryd.jpg"
        },
        {
            "name": "Oleh Beksiak",
            "websiteUrl": "https://snorchara.github.io/my-website/",
            "codeSourceUrl": "https://github.com/Snorchara/my-website",
            "cvUrl": "",
            "photo": "images/students/beksiak.jpg"
        },
        {
            "name": "Roman Melnik",
            "websiteUrl": "https://romanmelnik1.github.io/personalpage/",
            "codeSourceUrl": "https://github.com/RomanMelnik1/personalpage",
            "cvUrl": "",
            "photo": "images/students/melnik.jpg"
        },
        {
            "name": "Roman Oliynyk",
            "websiteUrl": "http://www.test8.3d.lviv.ua/landings/snailsfarm/index.php",
            "codeSourceUrl": "http://www.test8.3d.lviv.ua/landings/snailsfarm/index.php",
            "cvUrl": "https://www.linkedin.com/in/oliynykroman/",
            "photo": "images/students/oliynyk.jpg"
        },
        {
            "name": "Serhii Zhyhadlo",
            "websiteUrl": "https://completedsaite-zhyhadlo.c9users.io/index.html",
            "codeSourceUrl": "",
            "cvUrl": "",
            "photo": "images/students/zhyhadlo.jpg"
        },
        {
            "name": "Yehor Shantarin",
            "websiteUrl": "https://og1rock.github.io/mainproject/about.html",
            "codeSourceUrl": "https://github.com/og1rock/mainproject",
            "cvUrl": "",
            "photo": "images/students/shantarin.jpg"
        },
        {
            "name": "Yurii Spirniak",
            "websiteUrl": "https://rotteen.github.io/dz6/",
            "codeSourceUrl": "https://github.com/rotteen/dz6",
            "cvUrl": "",
            "photo": "images/students/spirniak.jpg"
        },
        {
            "name": "Zakharii Pavliuk",
            "websiteUrl": "https://zakhar90.github.io/photography/index.html",
            "codeSourceUrl": "https://github.com/zakhar90/photography",
            "cvUrl": "",
            "photo": "images/students/pavliuk.jpg"
        },
        {
            "name": "Kostiantyn Depa",
            "websiteUrl": "https://kostyadepa.github.io/final-project/",
            "codeSourceUrl": "https://github.com/kostyadepa/final-project",
            "cvUrl": "",
            "photo": "images/students/depa.jpg"
        },
        {
            "name": "Olha Melnyk",
            "websiteUrl": "https://my-page-olha96.c9users.io/index.html#home",
            "codeSourceUrl": "https://github.com/melnyko/My-page",
            "cvUrl": "",
            "photo": "images/students/melnyk.jpg"
        }
    ];

    // Promise-based API
    return {
        loadAll: function () {
            // Simulate async nature of real remote calls
            return $q.when(students);
        }
    };
}]);
