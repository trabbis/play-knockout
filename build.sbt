name := "play-knockout"
organization := "example"
version := "1.0-SNAPSHOT"

lazy val root = (project in file("."))
  .enablePlugins(PlayJava)

scalaVersion := "2.13.12"

libraryDependencies += guice

// For debugging: use `sbt -jvm-debug 9999 run` (Play runs in the sbt JVM, so -jvm-debug is required)
