import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getCourses(query) {
  await fakeNetwork(`getCourses:${query}`);
  let courses = await localStorage.getItem("courses");
  if (!courses) courses = [];
  if (query) {
    courses = matchSorter(courses, query, { keys: ["name"] });
  }
  return courses.sort(sortBy("last", "createdAt"));
}

export async function createCourse() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let course = { id, createdAt: Date.now() };
  let courses = await getCourses();
  courses.unshift(course);
  await set(courses);
  return course;
}

export async function getCourse(id) {
  await fakeNetwork(`course:${id}`);
  let courses = await localStorage.getItem("courses");
  let course = courses.find((course) => course.id === id);
  return course ?? null;
}

export async function updateCourse(id, updates) {
  await fakeNetwork();
  let courses = await localStorage.getItem("courses");
  let course = courses.find((course) => course.id === id);
  if (!course) throw new Error("No course found for", id);
  Object.assign(course, updates);
  await set(courses);
  return course;
}

export async function deleteCourse(id) {
  let courses = await localStorage.getItem("courses");
  let index = courses.findIndex((course) => course.id === id);
  if (index > -1) {
    courses.splice(index, 1);
    await set(courses);
    return true;
  }
  return false;
}

function set(courses) {
  return localStorage.setItem("courses", JSON.stringify(courses));
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
