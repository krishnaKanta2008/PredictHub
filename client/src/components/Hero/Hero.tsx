import { Button } from "@/components/ui/button"

const Hero = () => {
  return (
      <div >
          <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56 -mt-3">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                  <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-gray-700">
                      PredictHub: Your gateway to smarter market insights and foresight.{' '}
                      <a href="/learning" className="font-semibold text-indigo-600">
                          <span aria-hidden="true" className="absolute inset-0" />
                          Read more <span aria-hidden="true">&rarr;</span>
                      </a>
                  </div>
              </div>
              <div className="text-center">
                  <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-gray-400">
                     Predicting market trends with accuracy
                  </h1>
                  <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                      Predict tomorrow's market, today.
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                      <Button
                          onClick={() => {
                              window.location.href = '/signup';
                          }}
                      >
                          Get started
                      </Button>
                      <a href="/learning" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                          Learn more <span aria-hidden="true">→</span>
                      </a>
                  </div>
              </div>
          </div>
          
      </div>
  )
}

export default Hero