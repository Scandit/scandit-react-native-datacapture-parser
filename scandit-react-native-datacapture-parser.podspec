require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

version = package["version"]

Pod::Spec.new do |s|
  s.name                    = package["name"]
  s.version                 = version
  s.summary                 = package["description"]
  s.homepage                = package["homepage"]
  s.license                 = package["license"]
  s.authors                 = { package["author"]["name"] => package["author"]["email"] }
  s.platforms               = { :ios => "14.0" }
  s.source                  = { :git => package["homepage"] + ".git", :tag => "#{s.version}" }
  s.swift_version           = '5.0'
  s.source_files            = "ios/Sources/**/*.{h,m,swift}"
  s.requires_arc            = true
  s.module_name             = "ScanditDataCaptureParser"
  s.header_dir              = "ScanditDataCaptureParser"

  s.dependency "React"
  s.dependency "scandit-react-native-datacapture-core", "= #{version}"
  s.dependency "scandit-datacapture-frameworks-parser", '= 7.1.0'
end

